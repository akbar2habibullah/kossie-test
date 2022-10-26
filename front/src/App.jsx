import React, { useEffect } from 'react'
import { Heading, VStack, Tabs, Tab, TabPanel, TabPanels, TabList } from '@chakra-ui/react'
import { useStore, useEvent } from 'effector-react'

import TaskList from './features/TaskList'
import AddTask from './features/AddTask'
import ArchivedTask from './features/ArchivedTask'

import { fetchTodo } from './app/event'

function App() {
	const fetchEvent = useEvent(fetchTodo)

	useEffect(() => {
		fetchEvent()
	}, [])

	return (
		<VStack p={4} minH='100vh' pb={28}>
			<Heading p='5' fontWeight='extrabold' size='xl' bgGradient='linear(to-l, blue.500, green.400)' bgClip='text'>
				Kossie To-Do-List
			</Heading>
			<Tabs isFitted align='center' variant='soft-rounded' maxW='90vw'>
				<TabList>
					<Tab w='70px' _selected={{ color: 'white', bg: 'green.400' }}>
						Active
					</Tab>
					<Tab w='70px' _selected={{ color: 'white', bg: 'blue.500' }}>
						Archived
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<VStack minH='100vh'>
							<AddTask />
							<TaskList />
						</VStack>
					</TabPanel>
					<TabPanel>
						<VStack minH='100vh'>
							<ArchivedTask />
						</VStack>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</VStack>
	)
}

export default App
