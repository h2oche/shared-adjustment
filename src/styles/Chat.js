const styles = _theme => ({
  name: {

  },
  date: {
    fontSize: "0.7em",
    marginLeft: "5px",
    color: "#999"
  },
  content: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1.1rem"
  },
  newChat: {
    minHeight: "70px",
    maxHeight: "70px",
    width: "98%",
    display: "inline-block",
    fontSize: "12px",
    resize: "none",
    border: "1px solid",
    borderColor: _theme.palette.primary.main
  },
  newChatContainer: {
    padding: "5px"
  },
  newChatSendBtn: {
    margin: _theme.spacing(1)
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "74vh",
    width: "100%"
  },
  chatListContainer: {
    flex: 8,
    height: "500px"
  },
  chatListItemContainer: {
    overflowX: "hidden",
    overflowY: "auto",
    height: "100%"
  },
  chatInputContainer: {
    flex: 1
  }
});

export default styles;