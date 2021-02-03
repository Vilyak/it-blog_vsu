import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
const ReactMarkdown = require('react-markdown');

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: (({...props }) => (
        <li style={{marginTop: '5px'}}>
          <Typography  component="span" {...props} />
        </li>
      )),
    },
  },
};

export default function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
