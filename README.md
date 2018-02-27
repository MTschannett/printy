
# Printy 🖨

Small typescript library that should help you printing PDF Files, HTMLElements, JSON and so on..

This library is inspired by https://github.com/crabbly/print.js

## Usage

To use Printy. 

Simply install it from npm.

After that you can use it like this:

```
    const printy = new Printy(); // Creates a new Printy Instance.
```
After this we have a three options to use printy.

Following inputs can be made:
- string: This represents a url. Everything that can be displayed by a iframe can be inserted here.
- HTMLElement: A element that should be printed.
- file: A file that was uploaded (e.g. via `<input type="file">`. At the moment only images are supported)

```
    // Printing a url.
    printy.print('http://link-to-a-printable.pdf/document.pdf') 
    
    // Printing a element.
    const element = document.querySelector("#printable-element")
    printy.print(element)
    
    // Printing a file
    const file = document.getElementById('input').files[0];
    printy.print(file)
```

Printy will choose to either trigger a printing dialog (currently only in chrome) or a new tab (all other browsers)

## Todos

- Add tests
- Try to print all files not only images
- Add more documentation and comments in code

