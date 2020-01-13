import { Input, Button, Checkbox, Form } from "antd";
import React from "react";
import { getShortURL } from "../service/UrlShortenService";
import { message, Typography } from "antd";

const { Paragraph } = Typography;

class ShortUrl extends React.Component {
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

  getPocketURL = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("err");
        return;
      } else {
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

        getShortURL(params).then(result => {
          if (result.data !== undefined) {
            this.setState({
              shortUrl: result.data.shortUrl
            });
          } else {
            this.setState({
              shortUrl: undefined
            });

            message.error(
              (result.response &&
                result.response.data &&
                result.response.data) ||
                "Error"
            );
          }
        });
      }
    });
  };

  handleCustomValueChange = event => {
    this.setState({
      customValue: event.target.value
    });
  };

  render() {
    const { isCustom } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="url-input-wrapper" onSubmit={this.getPocketURL}>
        <Form.Item>
          {getFieldDecorator("longUrl", {
            rules: [{ required: true, message: "Please enter the long URL!" }]
          })(
            <Input
              placeholder="Enter long URL"
              allowClear
              autoFocus
              onChange={this.handleLongUrlChange}
            />
          )}
        </Form.Item>

        {isCustom === true ? (
          <Form.Item>
            {getFieldDecorator("customValue", {
              rules: [
                { required: true, message: "Please enter the custom name!" }
              ]
            })(
              <Input
                allowClear
                addonBefore="www.pocketurl/"
                placeholder="Custom Name"
                onChange={this.handleCustomValueChange}
              />
            )}
          </Form.Item>
        ) : null}

        <Button type="primary" block htmlType="submit">
          Get your Pocket Sized URL!
        </Button>

        <Checkbox className="checkbox" onChange={this.handleCustomToggle}>
          Create a Custom URL!
        </Checkbox>

        {this.state.shortUrl !== undefined ? (
          <Paragraph copyable>{this.state.shortUrl}</Paragraph>
        ) : null}
      </Form>
    );
  }
}

export default Form.create()(ShortUrl);
