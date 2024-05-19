import chalk from "chalk";


export function menuTitle(title: string){
    const mainMenuTemplate = `
    ${chalk.bold("===========================")}
        ${chalk.bold(title)}
    ${chalk.bold("===========================")}
    `
    console.log(mainMenuTemplate)
}