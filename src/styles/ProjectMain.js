const styles = _theme => ({
  sliderContainer: {
    background: _theme.palette.primary.main,
    padding: "30px 0"
  },
  projectMainContainer: {
    marginTop: "10px",
  },
  instrSlider: {
    width: "90%",
    margin: "auto",
    background: "#fff"
  },
  instrContainer: {
    height: "500px",
    overflow: "scroll",
    padding: "10px"
  },
  toolbarContainer: {
    marginTop: "20px"
  },
  instrWrapper: {
    padding: "10px",
    marginBottom: "10px"
  },
  headingBackground: {
    backgroundColor: _theme.palette.primary.main
  },
  secondaryHeadingBackground: {
    backgroundColor: _theme.palette.secondary.main,
  },
  heading: {
    fontSize: _theme.typography.pxToRem(20),
    fontWeight: "bold",
    flexBasis: '50%',
    flexShrink: 0,
    color: "white"
  },
  secondaryHeading: {
    fontSize: _theme.typography.pxToRem(15),
    fontWeight: "bold",
    flexBasis: '50%',
    flexShrink: 0,
    color: "white"
  },
  paragraph: {
    marginBottom: _theme.spacing(3)
  },
  tab1: {
    marginLeft: _theme.spacing(2),
  },
  bottom1: {
    marginBottom: _theme.spacing(1)
  },  
  info: {
    color: _theme.palette.text.secondary,
    fontSize: _theme.typography.pxToRem(13)
  }
});

export default styles;