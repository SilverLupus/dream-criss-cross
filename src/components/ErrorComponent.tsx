const ErrorComponent = ({error}: {error: string}) => {
  return (
    <span className='text-red-500'>{error}</span>
  )
}

export default ErrorComponent