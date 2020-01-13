import { Input, Button, Form } from "antd";
import React from "react";
import { getURLstatistics } from "../service/UrlStatisticsService";
import { message, Typography } from "antd";

const { Title } = Typography;

class UrlClicks extends React.Component {
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

  getClicks = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("err");
        return;
      } else {
        let { shortUrl } = this.state;

        let params = {
          shortUrl: shortUrl
        };

        getURLstatistics(params).then(result => {
          if (result.data !== undefined) {
            this.setState({
              clicks: result.data
            });
          } else {
            this.setState({
              clicks: undefined
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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="url-input-wrapper" onSubmit={this.getClicks}>
        <Form.Item>
          {getFieldDecorator("shortUrl", {
            rules: [{ required: true, message: "Please enter the short URL!" }]
          })(
            <Input
              placeholder="Enter short URL"
              allowClear
              autoFocus
              onChange={this.handleShortUrlChange}
            />
          )}
        </Form.Item>

        <Button type="primary" block htmlType="submit">
          Get your Pocket URL statistics!
        </Button>
        {this.state.clicks !== undefined ? (
          <div>
            <br />
            <br />
            <Title level={3}>This URL was hit {this.state.clicks} times</Title>
          </div>
        ) : null}
      </Form>
    );
  }
}

export default Form.create()(UrlClicks);
