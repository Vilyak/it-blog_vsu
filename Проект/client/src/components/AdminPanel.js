import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import ServerTable from 'react-strap-table';
import {ROOT_URL} from "../config";
import {GET_POSTS_URL} from "../urls";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {deletePost, toggleOnEditState} from "../actions";
import PostsEditorForm from "./PostsEditorForm";

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

export const AdminPanel = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const {updatesCount} = useSelector((store) => store);
    const [selectedRowID, setSelectedRowID] = React.useState(false);

    const url = useMemo(() => {
        return `${ROOT_URL}${GET_POSTS_URL}`;
    }, []);

    const columns = useMemo(() => ['postId', 'title', 'image', 'date', 'description', 'actions'], []);
    const serverTable = useMemo(() => React.createRef(), []);

    const options = {
        perPage: 5,
        sortable: ['postId', 'title', 'date'],
        columnsAlign: {postId: 'center', title: 'center', image: 'center', date: 'center',description: 'center'},
        responseAdapter: function (resp_data) {
            return {data: resp_data, total: resp_data.length}
        },
        icons: {
            sortUp: 'fa fa-sort-up',
            sortDown: 'fa fa-sort-down'
        }
    };

    useEffect(() => {
        serverTable.current.refreshData();
    }, [updatesCount])

    const onEdit = useCallback((row) => {
        const tmp = {...row};
        tmp.featured = tmp.featured === 1;
        dispatch(toggleOnEditState(tmp));
    }, [])

    const onDelete = useCallback((postId) => {
        dispatch(deletePost.request(postId));
    }, [dispatch, deletePost.request])


    return (
        <>
            <ServerTable
                columns={columns}
                url={url}
                ref={serverTable}
                pagination={false}
                options={options}
                bordered hover
            >
                {
                    function (row, column) {
                        switch (column) {
                            case 'image':
                                return (<img height={100} width={150} src={row.image}  className="table-image"/>);
                            case 'date':
                                return row[column] ? row[column] : 'Не заполнено';
                            case 'actions':
                                return (
                                    <div style={{textAlign: 'center'}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{margin: '10px'}}
                                            className={classes.button}
                                            endIcon={<EditIcon/>}
                                            onClick={() => {
                                                onEdit(row);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{margin: '10px', position: 'absolute'}}
                                            onClick={() => {
                                                setSelectedRowID(row.postId);
                                                setOpen(true);
                                            }}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                );
                            default:
                                return (row[column]);
                        }
                    }
                }
            </ServerTable>
            <PostsEditorForm/>
            <div>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={() => {setOpen(false)}}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Подтверждение"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Вы действительно хотите удалить этот пост?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setOpen(false)}} color="primary">
                            Нет
                        </Button>
                        <Button onClick={() => {setOpen(false); onDelete(selectedRowID)}} color="primary">
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
