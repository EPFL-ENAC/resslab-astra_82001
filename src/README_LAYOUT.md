# NESTED grid layout approach

```css
.parent {
  display: grid;
  grid-template-areas:
    'row1 row1 row1'
    'row2 row2 row2'
    'row3 row3 row3';
}

.row2 {
  grid-area: row2;
  display: grid;
  grid-template-columns: 1.2fr 4.2fr 1.2fr;
  grid-template-areas: 'c d g'; /* Define areas for row2 */
}

.row3 {
  grid-area: row3;
  display: grid;
  grid-template-columns: 1.2fr 4.2fr 1.2fr;
  grid-template-areas: 'c e h'; /* Define areas for row3 */
}

/* Targeting specific areas */
.area-g {
  grid-area: g; /* This will place it in the last column of row2 */
}

.area-h {
  grid-area: h; /* This will place it in the last column of row3 */
}
```

# Sub grid approach, more modern but only 89% support

```css
.parent {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1.2fr 4.2fr 150px;
  grid-template-areas:
    'a b f'
    'c d g'
    'c e h';
}

.row1 {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  grid-template-columns: 2.2fr 3.2fr 150px;
}

.row2,
.row3 {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  grid-template-columns: 1.2fr 4.2fr 150px;
}
```
