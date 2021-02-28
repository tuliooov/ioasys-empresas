import React from "react";
class Page extends React.Component {
  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    const PageComponent = this.props.component;

    return <PageComponent />;
  }
}
export default Page;
