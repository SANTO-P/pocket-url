import { Input, Button, Checkbox } from "antd";
import React from "react";
import { getShortURL } from "../service/UrlShortenService";
import { Typography } from "antd";

const { Paragraph } = Typography;

export default class ShortUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: undefined,
      isCustom: undefined,
      shortUrl: undefined,
      customValue: undefined
    };
  }

  handleLongUrlChange = event => {
    this.setState({
      longUrl: event.target.value
    });
  };

  handleCustomToggle = event => {
    this.setState({
      isCustom: event.target.checked
    });
  };

  getPocketURL = () => {
    let { longUrl } = this.state;

    let params = {
      longUrl: longUrl,
      customUrl: {
        flag: false,
        value: null
      }
    };

    if (this.state.isCustom) {
      params.customUrl = {
        flag: true,
        value: this.state.customValue
      };
    }

    getShortURL(params).then(result =>
      this.setState({
        shortUrl: result.shortUrl
      })
    );
  };

  handleCustomValueChange = event => {
    this.setState({
      customValue: event.target.value
    });
  };

  render() {
    const { isCustom } = this.state;

    return (
      <div className="url-input-wrapper">
        <Input
          placeholder="Enter long URL"
          allowClear
          autoFocus
          onChange={this.handleLongUrlChange}
        />

        {isCustom === true ? (
          <Input
            allowClear
            addonBefore="www.pocketurl/"
            placeholder="Custom Name"
            onChange={this.handleCustomValueChange}
          />
        ) : null}

        <Button type="primary" block onClick={this.getPocketURL}>
          Get your Pocket Sized URL!
        </Button>

        <Checkbox className="checkbox" onChange={this.handleCustomToggle}>
          Create a Custom URL!
        </Checkbox>

        {this.state.shortUrl !== undefined ? (
          <Paragraph copyable>{this.state.shortUrl}</Paragraph>
        ) : null}
      </div>
    );
  }
}
