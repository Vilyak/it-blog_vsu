import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Post} from "../types";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: '100%',
        height: '35%'
    }
});

interface Props {
    post?: Post;
}

export default function PostViewer(props: Props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {post} = props;

    return (
        <>
        {
            post ?
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h3">
                                {post.title}
                            </Typography>
                            <img className={classes.cardMedia} src={post.image} alt={post.imageText}/>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                        </CardContent>
                    </div>
                </Card> : null
        }
        </>
    );
}
