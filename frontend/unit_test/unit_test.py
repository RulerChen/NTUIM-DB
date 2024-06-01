from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    
    page.goto('http://localhost:3000/login')

    page.click('div.underline.cursor-pointer')
    page.fill('input[id="username"]', 'unit_Test')
    page.fill('input[id="email"]', 'unit_Test@gmail')
    page.fill('input[id="password"]', '123')
    page.fill('input[id="confirmed_password"]', '123')
    page.fill('input[id="age"]', '18')
    page.fill('input[id="phone_number"]', '123465789')
    page.click('button[type="submit"]')
    page.wait_for_selector('button:has-text("登入")')

    page.fill('input[id="email"]', 'unit_Test@gmail')
    page.fill('input[id="password"]', '123')
    
    with page.expect_navigation():
        page.click('button:has-text("登入")')
    
    with page.expect_navigation():
        page.click('button:has-text("新增活動")')
    page.fill('input[id="title"]', 'unit test')
    page.fill('textarea[id="description"]', 'unit test')
    page.fill('input[id="event-start"]', '2024-06-30T10:30')
    page.fill('input[id="event-end"]', '2024-06-30T11:30')
    page.fill('input[id="location"]', 'taipei')
    page.fill('input[id="capacity"]', '10')
    page.fill('input[id="register-start"]', '2024-05-30T10:30')
    page.fill('input[id="register-end"]', '2024-05-30T11:30')
    page.fill('input[id="student-fee"]', '100')
    page.fill('input[id="non-student-fee"]', '200')
    page.set_input_files('input[name="image"]', 'C:\\Users\\a0981\\Downloads/張愛玲半生緣.png')
    page.click('div:has-text("演講")')
    with page.expect_navigation():
        page.click('button[type="submit"]')

    page.wait_for_timeout(5000)
    
    page.screenshot(path='success.png')
    
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
