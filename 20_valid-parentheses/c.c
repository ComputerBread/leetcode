#include <stdbool.h>

bool f(char* s, int* i, int depth);

bool isValid(char* s) {
  int index = 0;
  bool res = true;
  while (s[index] != '\0' && res) {
    res = f(s, &index, 0);
  }
  return res;
}

bool matching(char open, char close) {
  return (open == '(' && close == ')') ||
         (open == '{' && close == '}') ||
         (open == '[' && close == ']');
  }

bool f(char* s, int* i, int depth) {
  char curr = s[*i];
  if (curr == '(' || curr == '{' || curr == '[') {
    (*i)++;
    if (!f(s, i, depth+1)) {
      return false;
    }
    return matching(curr, s[*i]);
  } else {
    return depth != 0;
  }
}


char stackPush(char* s, char* top, int length, int* i);
bool isValid2(char* s) {

  int i = 0;
  char top = '\0';
  while (s[i] != '\0') {
    if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
      if (stackPush(s, &top, 0, &i)) {
        return false;
      }
      // stackPush(s, &s[i], 1, &i);
    } else {
      return false;
    }
    i++;
  }
  return true;

}

char stackPush(char* s, char* top, int length, int* i) {
  while (s[*i] != '\0') {
    if (s[*i] == '(' || s[*i] == '{' || s[*i] == '[') {
      if (!stackPush(s, &s[*i], length+1, i)) {
        return false;
      }
    } else if (length == 0 || !matching(*top, s[*i])) {
      return false;
    }
    i++;
  }
  return true;
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
    } else { // closing
      // if closing we need to pop off the stack right?
      // so we need to return here
      // what about the value of i?
      (*size)--; // pop-off stack
      return matching(el, s[*i]);
    }
    (*i)++;
  }
  return size == 0;
}

char isValid3(char* s) {
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

//----------------------------------------------------------------------------

bool sp2(char* s, char* el, int* i, int* size) {
  while (*(s+*i) != '\0') {
    if (*(s+*i) == '(' || *(s+*i) == '{' || *(s+*i) == '[') {
      char* cur = s+*i;
      (*size) += 1;
      (*i)++;
      if (!sp2(s, cur, i, size)) {
        return false;
      }
    } else { // closing
      // if closing we need to pop off the stack right?
      // so we need to return here
      // what about the value of i?
      (*size)--; // pop-off stack
      return matching(*el, s[*i]);
    }
    (*i)++;
  }
  return size == 0;
}

char isValid4(char* s) {
  int size = 0;
  int i = 0;
  while (*(s+i) != '\0') {
    if (*(s+i) == '(' || *(s+i) == '{' || *(s+i) == '[') {
      char* el = s+i;
      i++;
      size++;
      if (!sp2(s, el, &i, &size)) {
        return false;
      }
    } else {
      return false;
    }
    i++;
  }
  return size == 0;
}


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
