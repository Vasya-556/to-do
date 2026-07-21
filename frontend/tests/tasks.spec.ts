import { test, expect } from "@playwright/test"

test("full task workflow", async ({ page }) => {
    const title = `Playwright task ${Date.now()}`
    const updatedTitle = `${title} updated`

    await page.goto("/")

    await page.getByRole(
        "link",
        {
            name: "Create task",
            exact: true
        }
    ).click()

    await page.getByPlaceholder(
        "Title",
        {
            exact: true
        }
    ).fill(title)

    await page.getByPlaceholder(
        "Description",
        {
            exact: true
        }
    ).fill("Description")

    await page.getByPlaceholder(
        "Category",
        {
            exact: true
        }
    ).fill("Testing")

    await page.locator(
        'input[type="number"]'
    ).fill("5")

    await page.getByRole(
        "button",
        {
            name: "Create",
            exact: true
        }
    ).click()

    const taskCard = page
        .getByText(
            title,
            {
                exact: true
            }
        )
        .locator(
            "xpath=ancestor::*[@data-slot='card']"
        )

    await expect(
        taskCard
    ).toContainText(
        "Status: Undone"
    )

    await page.getByPlaceholder(
        "Search",
        {
            exact: true
        }
    ).fill(title)

    await expect(
        taskCard
    ).toBeVisible()

    const checkbox = taskCard.getByRole(
        "checkbox"
    )

    await checkbox.click()

    await expect(
        taskCard
    ).toContainText(
        "Status: Done"
    )

    await checkbox.click()

    await expect(
        taskCard
    ).toContainText(
        "Status: Undone"
    )

    await taskCard.getByRole(
        "link"
    ).click()

    await page.getByPlaceholder(
        "Title",
        {
            exact: true
        }
    ).fill(updatedTitle)

    await page.getByRole(
        "button",
        {
            name: "Update",
            exact: true
        }
    ).click()

    await expect(
        page.getByText(
            updatedTitle,
            {
                exact: true
            }
        )
    ).toBeVisible()

    await page.goto("/")

    const updatedTaskCard = page
        .getByText(
            updatedTitle,
            {
                exact: true
            }
        )
        .locator(
            "xpath=ancestor::*[@data-slot='card']"
        )

    await expect(
        updatedTaskCard
    ).toBeVisible()

    await updatedTaskCard.getByRole(
        "button"
    ).click()

    await expect(
        page.getByText(
            updatedTitle,
            {
                exact: true
            }
        )
    ).not.toBeVisible()
})