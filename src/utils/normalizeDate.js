export default  (date) => {
    const newDate = new Date(date)
    const month = newDate.getMonth()
    const year = newDate.getFullYear().toString().slice(2)
    return `${month}-${year}`
  }
  