import React, { useState } from 'react'
import { Button, HStack, Input, useToast, Textarea, Modal, ModalBody, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, FormControl, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { useEvent } from 'effector-react'

import { addTodo } from '../../app/event'

function AddTask() {
	const toast = useToast()
	const addEvent = useEvent(addTodo)
	const [title, setTitle] = useState('')
	const [detail, setDetail] = useState('')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef()

	function handleSubmit() {
		if (!title.trim() || !detail.trim()) {
			toast({
				title: 'Please fill the task and detail',
				position: 'top',
				status: 'warning',
				duration: 2000,
				isClosable: true,
			})

			return
		}

		addEvent({ title, desc: detail })

		setTitle('')
		setDetail('')

		onClose()

		toast({
			title: 'Task Added',
			position: 'top',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}

	return (
		<HStack mt='4' mb='4'>
			<Button colorScheme='green' px='8' pl='10' pr='10' h='46' w='150px' type='submit' onClick={onOpen}>
				New Task?
			</Button>

			<Modal isCentered initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w='90%'>
					<ModalHeader>Add new task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl mb={3}>
							<Input ref={initialRef} placeholder='Please fill the title' onChange={(e) => setTitle(e.target.value)} onFocus={(e) => setTitle(e.target.value)} />
						</FormControl>
						<FormControl>
							<Textarea ref={initialRef} placeholder='Please fill the detail' onChange={(e) => setDetail(e.target.value)} onFocus={(e) => setDetail(e.target.value)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='green' onClick={() => handleSubmit()}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</HStack>
	)
}

export default AddTask
