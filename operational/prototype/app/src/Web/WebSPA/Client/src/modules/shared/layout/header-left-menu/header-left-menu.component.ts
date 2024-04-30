import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

interface menu_item {
    title?: string;
    items?: sub_menu_item[];
    url?: string;
    right_button?: { text?: string, icon?: string }
}

interface sub_menu_item extends menu_item {
    start_icon?: string;
}

@Component({
    selector: 'app-header-left-menu',
    templateUrl: './header-left-menu.component.html',
    styleUrls: ['./header-left-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftMenuComponent implements OnInit {
    @Input("container") sideNav: MatSidenav;
    menu_items: menu_item[] = [
        {
            title: "ExLibris.com",
            items: [
                {
                    start_icon: "inventory_2",
                    title: "Vos commandes"
                },
                {
                    start_icon: "restart_alt",
                    title: "Relancer une commande"
                },
                {
                    start_icon: "list_alt",
                    title: "Nos produits",
                    url: "/catalog"
                },
                {
                    start_icon: "plus_one",
                    title: "L'Magasa+"
                },
                {
                    start_icon: "gavel",
                    title: "Cgv"
                },
                {
                    start_icon: "store",
                    title: "Nos points de retrait",
                    right_button: {
                        icon: 'chevron_right'
                    }
                }
            ]
        },
        {
            title: "Filter ...",
            right_button: { text: "Voir tout" },
            items: [
                {
                    title: "Par cas d'utilisation",
                    right_button: {
                        icon: 'chevron_right'
                    }
                },
                {
                    title: "Par marque",
                    right_button: {
                        icon: 'chevron_right'
                    }
                },
                {
                    title: "Par utilité",
                    right_button: {
                        icon: 'chevron_right'
                    }
                },
                {
                    title: "Par prix",
                    right_button: {
                        icon: 'chevron_right'
                    }
                },
                {
                    title: "Par secteur d'activité",
                    right_button: {
                        icon: 'chevron_right'
                    }
                },
                {
                    title: "Par taille d'entreprise",
                    right_button: {
                        icon: 'chevron_right'
                    }
                }
            ]
        },
        {
            title: null,
            items: [
                {
                    start_icon: "card_giftcard",
                    title: "Cartes cadeaux",
                },
                {
                    start_icon: "settings_suggest",
                    title: "Vos suggestions",
                },
                {
                    start_icon: "help_outline",
                    title: "Centre d'aide",
                },
                {
                    start_icon: "quiz",
                    title: "FAQ",
                }
            ]
        }
    ];


    constructor() { }

    ngOnInit(): void {
    }
}
