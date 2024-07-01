---
title: Simple validation with Javascript & JQuery
pubDate: 2024-05-29T04:18:49.122Z
type: blog
description: Form validation is an essential aspect of web development that ensures users provide the correct and expected input before submitting a form.
keywords:
  - javascript
  - validation
slug: simple-validation-javascript-jquery
categories:
  - Javascript Tips
heroImage: /images/blog-placeholder-1.jpg
---

Form validation is an essential aspect of web development that ensures users provide the correct and expected input before submitting a form. Implementing validation on the frontend improves user experience by providing immediate feedback and reducing the need for server-side validation alone. Here's a step-by-step guide on how to set up frontend validation for a form.

## Step 1: Wrap the Form with a `<form>` Tag and Add novalidate Attribute

The first step is to create your form structure in HTML and add the novalidate attribute. This attribute disables the browser's default validation, allowing you to implement custom validation.

```html
<form action="" class="Form js-form" method="POST" novalidate>
  <div class="Form__Field ">
    <label for="locationsingle-question_type"
      >Location type: <span>*</span></label
    >
    <select
      name="locationsingle-question_type"
      id="locationsingle-question_type"
      class="js-select2"
      required
    >
      <option value="Trainingen">Trainingen</option>
      <option value="Lidmaatschap">Lidmaatschap</option>
      <option value="Reserveren">Reserveren</option>
      <option value="Vrijwilligers">Vrijwilligers</option>
      <option value="Sponsoring">Sponsoring</option>
      <option value="Overige">Overige</option>
    </select>
    <span class="body-text-sm-medium primary-500 Form__Field__HelperText"
      >veld vraag type niet geldig</span
    >
  </div>

  <div class="Form__Field Form__Field--50">
    <label for="locationsingle-email">Email<span>*</span></label>
    <input
      id="locationsingle-email"
      name="locationsingle-email"
      type="email"
      placeholder="email@gmail.com"
      required
    />
    <span class="body-text-sm-medium primary-500 Form__Field__HelperText"
      >veld email niet geldig</span
    >
  </div>

  <div class="Stack Stack--JustifyCenter w-100">
    <button type="submit" class="Button Button--Primary Button--Xl">
      Submit
    </button>
  </div>
</form>
```

Note: make sure your structure field is like this:

```
-field wrapper [Form__Field]
-- label (optional)
-- input
-- helper text [Form__Field__HelperText]
```

## Step 2: Styling the Form and Invalid State

Next, let's add some CSS to style the form and the error messages. We'll also style the invalid state of the input fields

```scss
@use "/assets/css/src/abstracts/typo-mixins" as t;
@use "/assets/css/src/abstracts/variables" as v;
@use "/assets/css/src/abstracts/mixins" as m;

.Form {
    ...

    &.Form--Validated {
        ...
    }

    &__Field {
        ...

        &__HelperText {
            display: none;
        }


        label {
            ...
        }

        input,
        textarea,
        select {
            ...

            &:focus {
                ...
            }

            &:disabled,
            &.disabled,
            &:read-only {
                ...
            }

            &:invalid,
            &.invalid {
                ~ .Form__Field__HelperText {
                    .Form--Validated & {
                        display: inline;
                    }
                }
            }
        }
    }
}

```

## Step 3: Write JavaScript to Handle Validation and Add Additional Rules

Now, let's write the JavaScript to handle the validation. This script will check the form fields, display error messages, and prevent form submission if there are validation errors.

```javascript
import $ from "jquery";
import { emailRules, floatRules, phoneNumberRules } from "../abstract/regex";

const componentsForm = () => {
  const init = () => {
    execute();
  };

  const execute = () => {
    const el = {
      main: ".js-form",
      btnOpenFile: ".js-button-open-file",
    };
    if ($(el.main).length === 0) return;

    $(document).on("submit", el.main, function (e) {
      const form = e.target;

      const input = $(this).find(`input`);

      let isValid = {};
      input.each(function () {
        const type = $(this).attr("type");
        const c_type = $(this).data("type");
        const isRequired = $(this).prop("required");
        const isDisabled = $(this).prop("disabled");

        if (isDisabled) return;

        const value = $(this).val();
        const id = $(this).attr("id");

        const handleCondition = (condition) => {
          if (condition) {
            isValid[id] = "invalid";
          } else {
            delete isValid[id];
          }
        };

        switch (c_type) {
          case "float":
            handleCondition(!floatRules.test(value));
            break;

          default:
            break;
        }

        switch (type) {
          case "email":
            handleCondition(!emailRules.test(value));
            break;
          case "tel":
            handleCondition(!phoneNumberRules.test(value) && value !== "");
            break;
          case "file":
            if (isRequired)
              handleCondition(!this.files || this.files.length === 0);
            break;

          default:
            break;
        }
      });

      if (!form.checkValidity() || Object.values(isValid).length > 0) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add("Form--Validated");
    });

    $(document).on(
      "input",
      `${el.main} input, ${el.main} select, ${el.main} textarea`,
      function () {
        const c_type = $(this).data("type");
        const type = $(this).attr("type");
        const value = $(this).val();

        const handleCondition = (condition) => {
          if (condition) {
            $(this).addClass("invalid");
          } else {
            $(this).removeClass("invalid");
          }
        };

        switch (c_type) {
          case "float":
            handleCondition(!floatRules.test(value));
            break;

          default:
            break;
        }

        switch (type) {
          case "email":
            handleCondition(!emailRules.test(value));
            break;
          case "tel":
            handleCondition(!phoneNumberRules.test(value) && value !== "");
            break;

          default:
            break;
        }
      },
    );
  };
  init();
};

try {
  componentsForm();
} catch (error) {
  console.error("componentsForm", error);
}
```

## How to use it

### Basic

You can use it like you use HTML's built-in validation, such as involving type, required, etc

### Custom validation

- You can add a `data-type` attribute to the `input`. like code below

```html
<input
  id="locationsingle-email"
  name="locationsingle-email"
  type="text"
  data-type="float"
  placeholder="email@gmail.com"
  required
/>
```

- then you can write rules in javascript according to your wishes. in this case I use regex to write the rules

```javascript
const floatRules = /^\d+(\.\d+)?$/;
// edit the js on this part

$(document).on("submit", el.main, function (e) {
   ...
  switch (c_type) {
    case "float":
      handleCondition(!floatRules.test(value));
      break;

    default:
      break;
  }
  ...
});

$(document).on(
  "input",
  `${el.main} input, ${el.main} select, ${el.main} textarea`,
  function () {
    ...
    switch (c_type) {
      case "float":
        handleCondition(!floatRules.test(value));
        break;

      default:
        break;
    }
    ...
  }
);
```

## Conclusion

Implementing frontend validation enhances user experience by providing immediate feedback and reducing errors before data reaches the server. By following these steps—wrapping the form with a `form` tag and adding the `novalidate` _(novalidate will deactive validation default. and we override via javascript)_ attribute, styling the form and its invalid state, and writing JavaScript to handle validation—you can create robust and user-friendly forms. This approach ensures users provide the correct input, ultimately leading to better data quality and smoother interactions.
