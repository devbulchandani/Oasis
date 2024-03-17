import {test, expect} from "@playwright/test";
const UI_URL = "http://localhost:5173"
import path from "path"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("devbulchandani8@gmail.com");
    await page.locator("[name=password]").fill("123456");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
})

test("should allow users to add a hotel", async ({page}) => {
    await page.goto(`${UI_URL}/add-hotel`)

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
            await page.selectOption('select[name = "starRating"]', "3");

    await page.getByText("Motel").click();

    await page.getByLabel("Free Wi-Fi").check();
    await page.getByLabel("Restaurant").check();
    await page.getByLabel("Library").check();

    await page.locator('[name="adultCount"]').fill("200");
    await page.locator('[name="childCount"]').fill("100");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
        path.join(__dirname, "files", "3.jpg"),
        path.join(__dirname, "files", "4.jpg"),
    ])

    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByAltText("Hotel Saved")).toBeVisible();
})

test("should display hoyels", async ({page}) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText('Dev Bulchandani')).toBeVisible();
    await expect(page.getByText('thxhugcyrlkjfbvb gbjnvguy')).toBeVisible();
    await expect(page.getByText("Jaipur,India")).toBeVisible();
    await expect(page.getByText("Homestay")).toBeVisible();
    await expect(page.getByText("₹4000 per night")).toBeVisible();

    await page.getByRole("link", { name: "View Details"}).click(); 
    await page.getByRole("link", { name: "Add Hotel"}).click(); 
})