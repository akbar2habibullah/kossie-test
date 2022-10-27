import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
	await page.goto('http://localhost:5173/')

	const heading = page.getByRole('heading', { name: 'Kossie To-Do-List' })

	await expect(heading).toHaveText('Kossie To-Do-List')

	const taskList1 = page.getByRole('heading', { name: 'No Task' })

	await expect(taskList1).toHaveText('No Task')

	await page.getByRole('button', { name: 'New Task?' }).click()

	await page.getByPlaceholder('Please fill the title').click()

	await page.getByPlaceholder('Please fill the title').fill('tes todo 1')

	await page.getByPlaceholder('Please fill the detail').click()

	await page.getByPlaceholder('Please fill the detail').fill('tes todo desc 1')

	await page.getByRole('button', { name: 'Save' }).click()

	const taskList2 = page.getByRole('heading', { name: 'tes todo 1' })

	await expect(taskList2).toHaveText('tes todo 1')

	await page.getByRole('button').nth(1).click()

	await page.getByPlaceholder('Please fill the title').fill('tes todo 1 updated')

	await page.getByRole('button', { name: 'Save' }).click()

	const taskList3 = page.getByRole('heading', { name: 'tes todo 1 updated' })

	await expect(taskList3).toHaveText('tes todo 1 updated')

	await page.getByRole('tabpanel', { name: 'Active' }).locator('div:has-text("tes todo 1 updatedtes todo desc 1")').nth(2).click()

	await page.getByRole('tab', { name: 'Archived' }).click()

	const taskList4 = page.getByRole('heading', { name: 'tes todo 1 updated' })

	await expect(taskList4).toHaveText('tes todo 1 updated')

	await page.getByText('tes todo 1 updatedtes todo desc 1').click()

	await page.getByRole('tab', { name: 'Active' }).click()

	const taskList5 = page.getByRole('heading', { name: 'tes todo 1 updated' })

	await expect(taskList5).toHaveText('tes todo 1 updated')

	await page.getByRole('button').nth(2).click()

	await page.getByRole('button', { name: 'Yes' }).click()

	const taskList6 = page.getByRole('heading', { name: 'No Task' })

	await expect(taskList6).toHaveText('No Task')
})
