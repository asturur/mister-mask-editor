import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '300px',
    margin: '0 16px',
  },
}));

export const GitHubBrowser = ({ repo, owner }) => {
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
    if (item.type === 'dir') {
      const pathArray = path.split('/');
      pathArray.push(encodeURI(item.name));
      setPath(pathArray.join('/'));
      setDataIsLoading(true);
    } else if (item.type === 'file') {
      console.log('clicked file', item.name)
    }
  }
  useEffect(() => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }).then(({ data }) => {
      setList(data.sort((a,b) => (a.type === 'file' ? 1 : -1)));
      setDataIsLoading(false);
    }).catch((e) => {
      console.error(e);
    });
  }, [repo, owner, path]);
  return (<div>
    <FormControl variant="outlined" >
      <InputLabel shrink htmlFor="select-multiple-native">
        Select a mask from MiSTer Devel
      </InputLabel>
      <Select
        multiple
        native
        classes={{
          root: classes.container,
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
