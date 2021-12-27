import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minHeight: '300px',
    minWidth: '250px',
  },
  container: {
    margin: '0 16px',
  },
});

export const GitHubBrowser = ({ repo, owner, fileLoader }) => {
  const [list, setList] = useState([]);
  const [path, setPath] = useState('Shadow_Masks');
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const isInFolder = path.split('/').length > 1;
  const classes = useStyles();
  const goBack = useCallback(() => {
    const pathArray = path.split('/');
    pathArray.pop();
    setPath(pathArray.join('/'));
  }, [path]);

  const clickItem = ({ target }) => {
    if (target.value === 'goBack') {
      goBack();
      return;
    }
    const item = list.find((item) => item.name === target.value) || {};
    const itemName = encodeURI(item.name);
    if (item.type === 'dir') {
      const pathArray = path.split('/');
      pathArray.push(itemName);
      setPath(pathArray.join('/'));
      setDataIsLoading(true);
    } else if (item.type === 'file') {
      fileLoader(item.download_url);
    }
  }

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }).then(({ data }) => {
      setDataIsLoading(false);
      setList(data.sort((a, b) => (a.type === 'file' ? 1 : -1)));
    }).catch((e) => {
      console.error(e);
    });
  }, [repo, owner, path]);

  return (<div className={classes.container}>
    <FormControl variant="outlined" >
      <InputLabel shrink htmlFor="select-multiple-native">
        Select a mask from MiSTer Devel
      </InputLabel>
      <Select
        multiple
        native
        classes={{
          root: classes.root,
        }}
        value={[]}
        // @ts-ignore Typings are not considering `native`
        onChange={clickItem}
        label="Select a mask from MiSTer Devel"
        inputProps={{
          id: 'select-multiple-native'
        }}
      >
      {isInFolder && !dataIsLoading && (
        <option key="goBack" value="goBack">../</option>
      )}
        {list.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  </div>);
};

export default GitHubBrowser;
