import { Input, Button } from "antd";
import React from "react";
import { getURLstatistics } from "../service/UrlStatisticsService";
import { Typography } from "antd";

const { Title } = Typography;

export default class UrlClicks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrl: undefined,
      clicks: undefined
    };
  }

  handleShortUrlChange = event => {
    this.setState({
      shortUrl: event.target.value
    });
  };

  getClicks = () => {
    let { shortUrl } = this.state;

    let params = {
      shortUrl: shortUrl
    };

    getURLstatistics(params).then(result =>
      this.setState({
        clicks: result
      })
    );
  };

  render() {
    return (
      <div className="url-input-wrapper">
        <Input
          placeholder="Enter short URL"
          allowClear
          autoFocus
          onChange={this.handleShortUrlChange}
        />

        <Button type="primary" block onClick={this.getClicks}>
          Get your Pocket URL statistics!
        </Button>
        {this.state.clicks !== undefined ? (
          <div>
            <br />
            <br />
            <Title level={3}>This URL was hit {this.state.clicks} times</Title>
          </div>
        ) : null}
      </div>
    );
  }
}
