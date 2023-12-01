const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

suite("Unit Tests", () => {
  suite("Puzzle string validation tests", () => {
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
  });
  suite("Placement check tests", () => {
    // Logic handles a valid row placement
    test("Logic handles a valid row placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[0][0]);
      assert.strictEqual(
        solver.checkRowPlacement(puzzle, 1, 9),
        true,
        "Valid row placement should return true",
      );
      assert.strictEqual(
        solver.checkRowPlacement(puzzle, 6, 9),
        true,
        "Valid row placement should return true",
      );
      done();
    });
    // Logic handles an invalid row placement
    test("Logic handles an invalid row placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[0][0]);
      assert.strictEqual(
        solver.checkRowPlacement(puzzle, 0, 8),
        false,
        "Invalid row placement should return false",
      );
      assert.strictEqual(
        solver.checkRowPlacement(puzzle, 6, 1),
        false,
        "Invalid row placement should return false",
      );
      done();
    });
    // Logic handles a valid column placement
    test("Logic handles a valid column placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[1][0]);
      assert.strictEqual(
        solver.checkColPlacement(puzzle, 1, 1),
        true,
        "Valid column placement should return true",
      );
      assert.strictEqual(
        solver.checkColPlacement(puzzle, 5, 9),
        true,
        "Valid column placement should return true",
      );
      done();
    });
    // Logic handles an invalid column placement
    test("Logic handles an invalid column placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[1][0]);
      assert.strictEqual(
        solver.checkColPlacement(puzzle, 1, 8),
        false,
        "Invalid column placement should return false",
      );
      assert.strictEqual(
        solver.checkColPlacement(puzzle, 5, 1),
        false,
        "Invalid column placement should return false",
      );
      done();
    });
    // Logic handles a valid region (3x3 grid) placement
    test("Logic handles a valid region (3x3 grid) placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[2][0]);
      assert.strictEqual(
        solver.checkRegionPlacement(puzzle, 6, 6, 9),
        true,
        "Valid region placement should return true",
      );
      assert.strictEqual(
        solver.checkRegionPlacement(puzzle, 0, 7, 1),
        true,
        "Valid region placement should return true",
      );
      done();
    });
    // Logic handles an invalid region (3x3 grid) placement
    test("Logic handles an invalid region (3x3 grid) placement", function (done) {
      const puzzle = solver.transformPuzzleString(puzzlesAndSolutions[3][0]);
      assert.strictEqual(
        solver.checkRegionPlacement(puzzle, 4, 2, 7),
        false,
        "Invalid region placement should return false",
      );
      assert.strictEqual(
        solver.checkRegionPlacement(puzzle, 1, 3, 9),
        false,
        "Invalid region placement should return false",
      );
      done();
    });
  });
  suite("Solver tests", () => {
    // TODO: Valid puzzle strings pass the solver
    // TODO: Invalid puzzle strings fail the solver
    // TODO: Solver returns the expected solution for an incomplete puzzle
  });
});
