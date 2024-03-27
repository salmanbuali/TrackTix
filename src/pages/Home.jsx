import {
  UserGroupIcon,
  CodeBracketIcon,
  PresentationChartBarIcon
} from '@heroicons/react/20/solid'

const Home = () => {
  const features = [
    {
      name: 'Create a team',
      description:
        'to handle specific types of tickets. Assign members with relevant expertise to each team. Improve communication and collaboration within your organization.',
      icon: UserGroupIcon
    },
    {
      name: 'Create Tickets',
      description:
        'Quickly submit tickets with clear descriptions and relevant details. Monitor the status of your tickets and see updates as they happen. Collaborate with teammates by adding comments and attachments to tickets.',
      icon: CodeBracketIcon
    },
    {
      name: 'Dashboard',
      description:
        'Keep track of the team performance. Enhance ticket resolution times with focused expertise within each team.',
      icon: PresentationChartBarIcon
    }
  ]

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Track your progress
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl">
                A better workflow
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-500">
                A platform where people can create and manage their teams for
                any type of business.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-slate-200">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline text-slate-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://cdn.discordapp.com/attachments/1220105308735541258/1222469260756914186/image.png?ex=66165438&is=6603df38&hm=f1aa10b651a9b80ee74203e557b1428cfc8c4a89af61ef61c415e5f15923ab58&"
            alt="Product screenshot"
            className="w-[48rem] max-w-none my-auto rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
