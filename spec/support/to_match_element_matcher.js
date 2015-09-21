import React from "react";
import _ from "lodash";

function formatErrors(errors, indent = 0) {
  return _(errors).map(error => {
    let indentedMessage = _.repeat(" ", indent * 2) + "* ";
    if (typeof error === "object" && "key" in error) {
      indentedMessage += `[${error.key}]: `;
    }
    indentedMessage += error.message;

    const subErrors = error.subErrors || [];
    return [indentedMessage].concat(formatErrors(subErrors, indent + 1));
  }).flatten().compact().join("\n");
}

function toArray(value) {
  if (_.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (typeof value === "object" && "toArray" in value) {
    return value.toArray();
  }

  return [];
}

function compressChildren(children) {
  return children.reduce((newChildren, child) => {
    let previousIndex = newChildren.length - 1;
    let previousChild = newChildren[previousIndex];
    const shouldAppendToPreviousString = (
      typeof child === "string" &&
      newChildren.length > 0 &&
      typeof previousChild === "string"
    );

    if (shouldAppendToPreviousString) {
      newChildren[previousIndex] = previousChild + child;
    } else {
      newChildren.push(child);
    }

    return newChildren;
  }, []);
}

function inspect(value) {
  if (React.isValidElement(value)) {
    return React.renderToStaticMarkup(value);
  } else {
    return jasmine.pp(value);
  }
}

class ReactElementMatcher {
  constructor(expected, actual) {
    this.expected = expected;
    this.actual = actual;
    this.errors = [];
  }

  match() {
    const propsMatcher = new ObjectMatcher(
      _.omit(this.expected.props, "children"),
      _.omit(this.actual.props, "children")
    );
    const childrenMatcher = new ReactElementCollectionMatcher(
      compressChildren(toArray(this.expected.props.children)),
      compressChildren(toArray(this.actual.props.children))
    );

    if (this.expected.type != this.actual.type) {
      this.errors.push({
        message: `Expected element's type to be '${this.expected.type}', ` +
          `got '${this.actual.type}'`
      });
    }

    if (!propsMatcher.match()) {
      this.errors.push({
        message: "Element's props did not match",
        subErrors: propsMatcher.errors
      });
    }

    if (!childrenMatcher.match()) {
      this.errors.push({
        message: "Element's children did not match",
        subErrors: childrenMatcher.errors
      });
    }

    return this.errors.length === 0;
  }

  formattedErrors() {
    return formatErrors(this.errors);
  }
}

class ReactElementCollectionMatcher {
  constructor(expecteds, actuals) {
    this.expecteds = expecteds;
    this.actuals = actuals;
    this.errors = [];
  }

  match() {
    if (this.expecteds.length === this.actuals.length) {
      _.any(_.zip(this.expecteds, this.actuals), ([expected, actual], i) => {
        if (React.isValidElement(expected) && React.isValidElement(actual)) {
          let matcher = new ReactElementMatcher(expected, actual);
          if (!matcher.match()) {
            this.errors.push({
              key: i,
              message: "Element does not match",
              subErrors: matcher.errors
            });
          }
        } else if (!_.isEqual(expected, actual)) {
          this.errors.push({
            key: i,
            message: `Expected ${inspect(expected)} to be equal to ${inspect(actual)}`
          });
        }
      });
    } else {
      this.errors.push({
        message: `Expected number of elements to be ${this.expecteds.length} ` +
          `but was ${this.actuals.length} instead`
      });
    }

    return this.errors.length === 0;
  }
}

class ObjectMatcher {
  constructor(expected, actual) {
    this.expected = expected;
    this.actual = actual;
    this.errors = [];
  }

  match() {
    if (!_.isEqual(this.expected, this.actual)) {
      this.errors.push({
        message: `Expected ${inspect(this.expected)}, got ${inspect(this.actual)}`
      });
    }

    return this.errors.length === 0;
  }
}

beforeEach(() => {
  jasmine.addMatchers({
    toMatchElement() {
      return {
        compare(actual, expected) {
          let matcher = new ReactElementMatcher(expected, actual);
          let result = {};

          if (matcher.match()) {
            result.pass = true;
          } else {
            result.pass = false;
            result.message = "Element did not match.\n" + matcher.formattedErrors();
          }

          return result;
        }
      };
    }
  });
});
