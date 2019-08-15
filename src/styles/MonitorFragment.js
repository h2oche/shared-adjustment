const size = 80;
const fontSize = 40;

const styles = _theme => ({
  container: {
    width: "150px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "15px 7px"
  },
  zero: {
    fontSize: `${fontSize}px`,
    width: `${size}px`,
    height: `${size}px`,
    border: "15px solid blue",
    borderRadius: "50%"
  },
  one: {
    fontSize: `${fontSize}px`,
    width: `${size}px`,
    height: `${size}px`,
    border: "15px solid green",
    borderRadius: "50%"
  },
  two: {
    fontSize: `${fontSize}px`,
    width: `${size}px`,
    height: `${size}px`,
    border: "15px solid yellow",
    borderRadius: "50%"
  },
  alert: {
    fontSize: `${fontSize}px`,
    width: `${size}px`,
    height: `${size}px`,
    border: "15px solid red",
    borderRadius: "50%"
  },
  monitorToggleBtn: {
    width: "110px",
    margin: "10px"
  }
});

export default styles;