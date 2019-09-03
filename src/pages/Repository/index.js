import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Container from '../../components/Container';
import {Loading, Owner, IssuesList} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const {match} = this.props;
    const repoName = decodeURIComponent(match.params.id);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const {repository, issues, loading} = this.state;
    if (loading) return <Loading>Loading</Loading>;
    return <Container>
      <Owner>
        <Link to="/">Back</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.name} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>

        <IssuesList>
          {issues.map(issue =>
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => <span key={String(label.id)}>
                    {label.name}
                  </span>)}
                </strong>
                <p>
                  {issue.user.login}
                </p>
              </div>
            </li>)}
        </IssuesList>
      </Owner>
    </Container>;
  }
}
