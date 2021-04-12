const Button = (buttonText, buttonFunction) => {
  return (
    <button onClick={ () => buttonFunction() }> { buttonText } </button>
  )
}

export default Button