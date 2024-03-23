const Members = ( { members } ) => {
  return (
    <ul
      role="list"
      className="divide-y dark:divide-gray-700 divide-gray-300 w-1/2 m-auto"
    >
      {/* {members.map((member) => (
        <li key={member.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
              src={member.avatar}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 dark:text-white text-gray-900">
                {member.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 dark:text-gray-400 text-gray-500">
                {member.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 dark:text-white text-gray-900">
              {member.role}
            </p>
          </div>
        </li>
      ))} */}
    </ul>
  )
}

export default Members
