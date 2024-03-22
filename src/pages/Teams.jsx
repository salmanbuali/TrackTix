import { Link } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const Teams = () => {
  const teams = [
    {
      name: 'Graph API',
      href: '#',
      members: 16,
      avatar:
        'https://www.drupal.org/files/styles/grid-3-2x/public/project-images/Graph%20API%20logo.png?itok=B8Gk4HZb'
    },
    {
      name: 'Design Team',
      href: '#',
      members: 12,
      avatar:
        'https://media.istockphoto.com/id/1303269536/vector/d-style-logo-icon-shape.jpg?s=612x612&w=0&k=20&c=TEmq8HzDGokNqTRIHSbLyiCD5zk_15lZZuGfBATiIlk='
    },
    {
      name: 'System testing',
      href: '#',
      members: 16,
      avatar: 'https://www.infoicontechnologies.com/img/system-testing.jpg'
    },
    {
      name: 'React Team',
      href: '#',
      members: 8,
      avatar:
        'https://static-00.iconduck.com/assets.00/react-icon-2048x2048-o8k3ymqa.png'
    }
  ]

  return (
    <div className="w-3/4 m-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white">
          Teams
        </h2>
        <Link to="/createteam">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
          >
            <PlusCircleIcon className="w-6 h-6 mr-2" />
            Team
          </button>
        </Link>
      </div>

      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {teams.map((team) => (
          <Link to={`/`} key={team.name}>
            <li className="col-span-1 flex rounded-md shadow-md overflow-hidden">
              <div className="flex items-center justify-center rounded-l-md text-white bg-white w-16 h-16">
                <img
                  src={team.avatar}
                  alt="team logo"
                  className="w-full h-auto my-1"
                />
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href={team.href}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {team.name}
                  </a>
                  <p className="text-gray-500">{team.members} Members</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Teams
