function skillsMember() {
  var skills = {
    name: "John Doe",
    age: 30,
    address: "123 Main St",
    city: "Miami",
    state: "FL",
    zip: 33101
  };
  // Only change code below this line.
  var checkProp = "name";
  if (skills.hasOwnProperty(checkProp)) {
    return skills[checkProp];
  } else {
    return "Not Found";
  }
  return "Change Me!";
  // Only change code above this line.
}
