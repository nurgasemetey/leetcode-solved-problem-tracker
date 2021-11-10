# leetcode-solved-problem-tracker action

This action saves number of solved problems for each day. Data are stored in `data.json`

Sample `data.json`

```json
[
  {
    "date": "2021-11-04",
    "count": 43
  },
  {
    "date": "2021-11-05",
    "count": 45
  },
  {
    "date": "2021-11-06",
    "count": 50
  }
]
```

## Inputs

## `username`

**Required** The leetcode username. Default ``.

## `github-token`

**Required** The github token. You can use `${{ secrets.GITHUB_TOKEN }}` which is automatically created.

## Example usage
```yaml
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '0 3 * * *' # according to UTC

jobs:
  leetcode_solved_problem_tracker:
    runs-on: ubuntu-latest
    name: Save each day's solved problem counts
    steps:
      - uses: actions/checkout@v2
      - name: leetcode-solved-problem-tracker step
        id: hello
        uses: nurgasemetey/leetcode-solved-problem-tracker@v1.5
        with:
          username: ${{ secrets.LEETCODE_USERNAME }} # if you want to hide your username
          github-token: ${{ secrets.GITHUB_TOKEN }} # no need to generate token, it is generated automatically when you use action
```

or 

```yaml
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '0 3 * * *' # according to UTC

jobs:
  leetcode_solved_problem_tracker:
    runs-on: ubuntu-latest
    name: Save each day's solved problem counts
    steps:
      - uses: actions/checkout@v2
      - name: leetcode-solved-problem-tracker step
        id: hello
        uses: nurgasemetey/leetcode-solved-problem-tracker@v1.5
        with:
          username: YOUR_LEETCODE_USERNAME
          github-token: ${{ secrets.GITHUB_TOKEN }} # no need to generate token, it is generated automatically when you use action
```
