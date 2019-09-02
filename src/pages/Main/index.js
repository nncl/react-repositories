import React, {Component} from 'react';
import {FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa';
import api from '../../services/api';
import {Container, Form, SubmitButton, List} from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({repositories: JSON.parse(repositories)});
    }
  }

  // Update localstorage
  componentDidUpdate(_, prevState) {
    const {repositories} = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({newRepo: e.target.value});
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    this.setState({loading: true});
    const {newRepo, repositories} = this.state;
    try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch {
      this.setState({loading: false});
    }
  };

  render() {
    const {newRepo, repositories, loading} = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {
            repositories.map(item => (
              <li key={item.name}>
                {item.name}
                <a href="">Detalhes</a>
              </li>
            ))
          }
        </List>
      </Container>
    );
  }
}
