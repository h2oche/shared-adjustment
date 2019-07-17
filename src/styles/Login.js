const styles = _theme => ({
  root: {
    height: '100vh'
  },
  wall: {
    backgroundImage: `url(https://www.fastweb.com/uploads/article_photo/photo/2161/crop380w_istock_000002193842xsmall-books.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: _theme.spacing(8,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form : {
    marginTop: _theme.spacing(1)
  },
  submit : {
    margin: _theme.spacing(3,0,2)
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  center : {
    textAlign: "center"
  }
});

export default styles;