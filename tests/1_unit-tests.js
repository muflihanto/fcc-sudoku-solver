const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

suite("Unit Tests", () => {
  // Logic handles a valid puzzle string of 81 characters
  test("Logic handles a valid puzzle string of 81 characters", function (done) {
    for (let puzzle of puzzlesAndSolutions) {
      assert.strictEqual(
        solver.validate(puzzle[0]),
        true,
        "Valid puzzle string input validation should return true",
      );
    }
    done();
  });
  // Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
    assert.throws(
      () => {
        solver.validate(puzzlesAndSolutions[0][0].slice(0, 80) + "A");
      },
      Error,
      "Invalid characters in puzzle",
      "Input with invalid characters should throw an error",
    );
    assert.throws(
      () => {
        solver.validate("x" + puzzlesAndSolutions[1][0].slice(1, 81));
      },
      Error,
      "Invalid characters in puzzle",
      "Input with invalid characters should throw an error",
    );
    assert.throws(
      () => {
        solver.validate("**" + puzzlesAndSolutions[2][0].slice(2, 81));
      },
      Error,
      "Invalid characters in puzzle",
      "Input with invalid characters should throw an error",
    );
    assert.throws(
      () => {
        solver.validate(
          puzzlesAndSolutions[3][0].slice(0, 40) + " " + puzzlesAndSolutions[3][0].slice(41, 81),
        );
      },
      Error,
      "Invalid characters in puzzle",
      "Input with invalid characters should throw an error",
    );
    done();
  });
  // Logic handles a puzzle string that is not 81 characters in length
  test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
    assert.throws(
      () => {
        solver.validate(puzzlesAndSolutions[0][0].slice(0, 80));
      },
      Error,
      "Expected puzzle to be 81 characters long",
      "Input with invalid length should throw an error",
    );
    assert.throws(
      () => {
        solver.validate(puzzlesAndSolutions[1][0].slice(12, 81));
      },
      Error,
      "Expected puzzle to be 81 characters long",
      "Input with invalid length should throw an error",
    );
    assert.throws(
      () => {
        solver.validate(puzzlesAndSolutions[2][0].slice(2, 72));
      },
      Error,
      "Expected puzzle to be 81 characters long",
      "Input with invalid length should throw an error",
    );
    assert.throws(
      () => {
        solver.validate(
          puzzlesAndSolutions[3][0].slice(0, 40) + puzzlesAndSolutions[3][0].slice(41, 81),
        );
      },
      Error,
      "Expected puzzle to be 81 characters long",
      "Input with invalid length should throw an error",
    );
    done();
  });
  // TODO: Logic handles a valid row placement
  // TODO: Logic handles an invalid row placement
  // TODO: Logic handles a valid column placement
  // TODO: Logic handles an invalid column placement
  // TODO: Logic handles a valid region (3x3 grid) placement
  // TODO: Logic handles an invalid region (3x3 grid) placement
  // TODO: Valid puzzle strings pass the solver
  // TODO: Invalid puzzle strings fail the solver
  // TODO: Solver returns the expected solution for an incomplete puzzle
});
