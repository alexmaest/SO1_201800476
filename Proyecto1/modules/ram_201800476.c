
#include <linux/proc_fs.h>
#include <linux/seq_file.h> 
#include <linux/hugetlb.h>
#include <asm/uaccess.h> 
#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>   
#include <linux/fs.h>

/*DOCUMENTACION DEL MODULO*/
MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM");
MODULE_AUTHOR("Marvin Alexis Estrada Florian");

struct sysinfo sysi;
static int ram_specs(struct seq_file *singleFile, void *v) {
    si_meminfo(&sysi);
    seq_printf(singleFile, "{\"Porcentaje\":\"%d",(((sysi.totalram)-(sysi.freeram))*100)/(sysi.totalram));
    seq_printf(singleFile, "\"}");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file) {
    return single_open(file, ram_specs, NULL);
}

static struct proc_ops operaciones= {
    .proc_open = al_abrir,
    .proc_read = seq_read 
};

static int _insert(void) {
    proc_create("ram_201800476", 0, NULL, &operaciones);
    printk(KERN_INFO "201800476\n");
    return 0;
}

static void _remove(void) {
    remove_proc_entry("ram_201800476", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);
