const testFunction = (datePlayed) => {
  var dNow = new Date().getTime();

  var week = 604800000; // in milliseconds

  var trackD = new Date(datePlayed).getTime();

  var weekAgo = dNow - week;

  if (trackD > weekAgo) {
    return true;
  } else {
    return false;
  }
};

test("date is within a week so return true", () => {
  const testD = "26/09/2021";
  expect(testFunction(testD)).toBe(true);
});
