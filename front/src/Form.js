function Form({
  button,
  keyboardEvent,
  insert,
  obj,
  cancel,
  remove,
  alterate
}) {
  return (
    <form>
      <input
        type="text"
        value={obj.name}
        onChange={keyboardEvent}
        name="name"
        placeholder="Name"
        className="form-control"
      />
      <input
        type="text"
        value={obj.brand}
        onChange={keyboardEvent}
        name="brand"
        placeholder="Brand"
        className="form-control"
      />

      {button ? (
        <input
          type="button"
          onClick={insert}
          value="Insert"
          className="btn btn-primary"
        />
      ) : (
        <div>
          <input
            type="button"
            value="Alterate"
            onClick={alterate}
            className="btn btn-warning"
          />
          <input
            type="button"
            value="Remove"
            onClick={remove}
            className="btn btn-danger"
          />
          <input
            type="button"
            value="Cancel"
            onClick={cancel}
            className="btn btn-secondary"
          />
        </div>
      )}
    </form>
  )
}

export default Form
