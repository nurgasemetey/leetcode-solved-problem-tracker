# leetcode-solved-problem-tracker action

This action saves number of solved problems for each day. It is stored `data.json`

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
    - cron:  '30 5,17 * * *'

jobs:
  leetcode_solved_problem_tracker:
    runs-on: ubuntu-latest
    name: Save each day's solved problem counts
    steps:
      - uses: actions/checkout@v2
      - name: leetcode-solved-problem-tracker step
        id: hello
        uses: nurgasemetey/leetcode-solved-problem-tracker@v1.4
        with:
          username: ${{ secrets.LEETCODE_USERNAME }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```