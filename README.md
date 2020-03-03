# Moved to column

This action allows you to get the name of the column in which the project card got moved to.

## Usage

Create a new workflow `.yml` file in the `.github/workflow` folder. In this new created file you have to specify the workflow event to `project_card` and the type to `moved`, this action only works on these event and type.

### moved-to-column.yml
```yml
name: Print the moved to column name

on:
  project_card:
    types: [moved]

jobs:
  moved-to-column:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
    steps:
    - uses: korti11/moved-to-column@v0.1
      id: project_column
    - run: echo ${{steps.project_column.outputs.column_name}}
```

### Input
#### Github Token
This is the only input that is needed. The token has to be in a environment variable as seen below. This token can ether be the `GITHUB_TOKEN` that is created with the repository or a [private access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token).
```yml
env:
      GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

### Output
#### Column name
You can get the column name with `steps.project_column.outputs.column_name` within the same job.