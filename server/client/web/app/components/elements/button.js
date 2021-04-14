const Button = ({buttonText, buttonFunction, className}) => {
  return (
    <button className={className} onClick={ () => buttonFunction() }> { buttonText } </button>
  )
}

export default Button