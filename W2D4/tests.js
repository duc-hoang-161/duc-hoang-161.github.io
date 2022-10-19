describe("String filter", function () {
  it("Filter function should filter out banned word", function () {
    assert("This is a house", "This is not a house".filter("not"));
    assert("This not joke. It truth.", "This is not a joke. It is a truth.".filter("is").filter("a"));
  });
  it("Filter function should not filter out word if it doesn"t exist in the string", function () {
    assert("This should be the same", "This should be the same".filter("is").filter("a"));
  })
});

describe("Array bubbleSort", function () {
  it("bubbleSort should return a sorted array with ascending order", function () {
    assert.deepEqual([1, 2, 3], [3, 2, 1].bubbleSort());
    assert.deepEqual([1, 2, 2, 3], [3, 2, 2, 1].bubbleSort());
  });
  it("bubbleSort should return a sorted array with descending order", function () {
    assert.deepEqual([3, 2, 1], [1, 3, 2].bubbleSort(true));
    assert.deepEqual([3, 2, 2, 1], [2, 1, 3, 2].bubbleSort(true));
  });
  it("bubbleSort should return a sorted array and sorted the original array with ascending order when passing true", function () {
    const arr = [1, 5, 46, 2, 5, 6];
    assert.deepEqual([1, 2, 5, 5, 6, 46], arr.bubbleSort());
    assert.deepEqual([1, 2, 5, 5, 6, 46], arr);
  });
  it("bubbleSort should return a sorted array and sorted the original array with descending order when passing true", function () {
    const arr = [1, 5, 46, 2, 5, 6];
    assert.deepEqual([46, 6, 5, 5, 2, 1], arr.bubbleSort(true));
    assert.deepEqual([46, 6, 5, 5, 2, 1], arr);
  });
})

describe("Teacher object", function () {
  it("teach function should return properly string when receiving subject string", function () {
    const teacher = new Teacher();
    teacher.initialize("Obi-wan Kenobi", 33);
    assert.equal("Obi-wan Kenobi is now teaching The Force 101", teacher.teach("The Force 101"));
    assert.equal("Obi-wan Kenobi is now teaching The Dark Side 101", teacher.teach("The Dark Side 101"));
  })
})
