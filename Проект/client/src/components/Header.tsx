import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useDispatch, useSelector} from "react-redux";
import {changeViewPostState, init, loginDialogState, openAdminPanelStatus} from "../actions";
import {BlogStore} from "../types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

interface Props {
  sections: Array<string>;
  title: string;
  onClickCategory?: (category: string) => void;
}

export default function Header(props: Props) {
  const classes = useStyles();
  const { sections, title, onClickCategory } = props;
  const {isOpenAdminPanel, isAuthed, openPostState} = useSelector((store: BlogStore) => store);
  const {isOpenPost} = openPostState;
  const dispatch = useDispatch();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        {(isOpenAdminPanel && isAuthed) || isOpenPost ? <Button onClick={() => {
          if (isOpenPost) {
            dispatch(changeViewPostState({state: false}));
          }
          else{
            dispatch(openAdminPanelStatus(false));
            dispatch(init.request());
          }
          }}  size="small">Назад</Button> : null}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {!isOpenAdminPanel ? <Button variant="outlined" size="small" onClick={() => {
          if (isAuthed && !isOpenAdminPanel) {
            dispatch(openAdminPanelStatus(true))
          }
          else{
            dispatch(loginDialogState(true));
          }
        }}>Войти</Button>: null}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Button
            color="inherit"
            key={section}
            className={classes.toolbarLink}
            onClick={() => {
                if (isOpenAdminPanel && isAuthed) {
                }
                else {
                  if (onClickCategory){
                    onClickCategory(section);
                  }
                }
            }}
          >
            {section}
          </Button>
        ))}
      </Toolbar>
    </>
  );
}