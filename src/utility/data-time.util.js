export const getDayDate = date => {
  const today = new Date();
  const inpDay = new Date(date);

  if (today.getFullYear() === inpDay.getFullYear() && today.getMonth() === inpDay.getMonth() ) {
    if (today.getDate() === inpDay.getDate())
      return 'Today';
    else if (today.getDate() + 1 === inpDay.getDate())
      return 'Tomorrow';
    else
      return date; 
  } else
    return date;
}
