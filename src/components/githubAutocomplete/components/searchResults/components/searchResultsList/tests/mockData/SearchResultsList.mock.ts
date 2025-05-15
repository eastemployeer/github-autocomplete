import { GithubFetchType, GithubRepository, GithubUser } from '../../../../hooks/types/useGithubFetch';

export const reposMock = [
  {
    id: 1,
    full_name: 'Repo 1',
    html_url: 'https://example.com/repo1',
    owner: {
      avatar_url: 'https://example.com/avatar1.png',
    },
  },
  {
    id: 2,
    full_name: 'Repo 2',
    html_url: 'https://example.com/repo2',
    owner: {
      avatar_url: 'https://example.com/avatar2.png',
    },
  },
] as GithubRepository[];

export const usersMock = [
  {
    id: 3,
    login: 'User 1',
    avatar_url: 'https://example.com/avatar1.png',
    html_url: 'https://example.com/user1',
  },
  {
    id: 4,
    login: 'User 2',
    avatar_url: 'https://example.com/avatar2.png',
    html_url: 'https://example.com/user2',
  },
] as GithubUser[];

export const searchResultsListItemsPropsMock = [
  {
    id: 1,
    name: 'Repo 1',
    url: 'https://example.com/repo1',
    avatarUrl: 'https://example.com/avatar1.png',
    fetchType: GithubFetchType.REPOSITORIES,
    active: expect.any(Boolean),
  },
  {
    id: 2,
    name: 'Repo 2',
    url: 'https://example.com/repo2',
    avatarUrl: 'https://example.com/avatar2.png',
    fetchType: GithubFetchType.REPOSITORIES,
    active: expect.any(Boolean),
  },
  {
    id: 3,
    name: 'User 1',
    avatarUrl: 'https://example.com/avatar1.png',
    url: 'https://example.com/user1',
    fetchType: GithubFetchType.USERS,
    active: expect.any(Boolean),
  },
  {
    id: 4,
    name: 'User 2',
    avatarUrl: 'https://example.com/avatar2.png',
    url: 'https://example.com/user2',
    fetchType: GithubFetchType.USERS,
    active: expect.any(Boolean),
  },
];
