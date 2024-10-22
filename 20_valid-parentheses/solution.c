// recursive ------------------------------------------------------------------
#include <stdbool.h>

bool match(char open, char close) {
  return (open == '(' && close == ')') ||
         (open == '{' && close == '}') ||
         (open == '[' && close == ']');
  }
bool sp(char* s, char el, int* i, int* size) {
  while (s[*i] != '\0') {
    if (s[*i] == '(' || s[*i] == '{' || s[*i] == '[') {
      char cur = s[*i];
      (*size) += 1;
      (*i)++;
      if (!sp(s, cur, i, size)) {
        return false;
      }
    } else {
      (*size)--;
      return match(el, s[*i]);
    }
    (*i)++;
  }
  return size == 0;
}

char isValid(char* s) {
    // define a stack
  int size = 0;
  int i = 0;
  while (s[i] != '\0') {
    if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
      char el = s[i];
      i++;
      size++;
      if (!sp(s, el, &i, &size)) {
        return false;
      }
    } else {
      return false;
    }
    i++;
  }
  return size == 0;
}

// ----------------------------------------------------------------------------
// If you don't care
bool isValid5(char* you_made_this) {

  char* i_made_this = you_made_this;

  for (char* i = you_made_this; *i != '\0'; i++) {
      switch (*i) {
      case '(':
          *i_made_this++ = ')';
          continue;
      case '{':
          *i_made_this++ = '}';
          continue;
      case '[':
          *i_made_this++ = ']';
          continue;
      default:
          if (i_made_this == you_made_this || *i != *--i_made_this) {
              return false;
          }
      }
  }

  return i_made_this == you_made_this;
}
