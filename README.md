# MCP server for news-data

MCP server for getting up-to-date information about your operating system


## Setup

If you clone this repo, then you can use the config below:

```json
{
  "mcpServers": {
    "os-info": {
        "command": "path_to_your_node",
        "args": [
            "location_to_your_dist/index.js"
        ]
    }
  }
}

```

You can also use <b>npx</b>.

```json
{
  "mcpServers": {
    "os-info": {
        "command": "path_to_your_npx",
        "args": [
            "os-info-mcp-server"
        ]
    }
  }
}

```




## Example Prompts

Give me latest news from USA trending today.

Give me top news headlines from Nepal in Nepali language.

Give me news sources from Bhutan.

Give me latest news about Lionel Messi.

Give me latest crypto news.

...
