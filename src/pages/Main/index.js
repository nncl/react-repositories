import React, {Component} from 'react';
import {FaGithubAlt, FaPlus} from 'react-icons/fa';
import api from '../../services/api';
import {Container, Form, SubmitButton} from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
  };

  handleInputChange = e => {
    this.setState({newRepo: e.target.value});
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const {newRepo, repositories} = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
    });
  };

  render() {
    const {newRepo} = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleFormSubmit}>
          <input type="text"
                 placeholder="Add repository"
                 value={newRepo}
                 onChange={this.handleInputChange} />

          <SubmitButton>
            <FaPlus color="#fff" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
