#include <linux/module.h> 
#include <linux/kernel.h> 
#include <linux/init.h>    
#include <linux/hugetlb.h> 
#include <linux/proc_fs.h> 
#include <asm/uaccess.h>
#include <linux/seq_file.h> 
#include <linux/sched.h> 
#include <linux/sched/signal.h>

/*DOCUMENTACION DEL MODULO*/
MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de CPU");
MODULE_AUTHOR("Marvin Alexis Estrada Florian");

struct task_struct *procesos, *subprocesos;
struct list_head *listap;
int cont;
int cont2;
long int ejecucion;
long int suspendido;
long int detenido;
long int zombie;

static int listar_procesos(struct seq_file *singleFile, void *v) {
    long procesomem;
    cont2 = 0;
    ejecucion = 0;
    suspendido = 0;
    detenido = 0;
    zombie = 0;
    seq_printf(singleFile,"{\n");
    seq_printf(singleFile, "\"Procesos\":[\n");
    for_each_process(procesos) {
        if(procesos->mm) {
            procesomem = get_mm_rss(procesos->mm);
        }
        if (cont2 == 0){
            cont2 = 1;
        }else{
            seq_printf(singleFile, ",");
        }
       
        if(procesos->__state == 0){
            ejecucion++;
        }else if(procesos->__state == 1 || procesos->__state == 1026){
            suspendido++;
        }else if(procesos->__state == 128){
            detenido++;
        }else if(procesos->__state == 260){
            zombie++;
        }
      
        char user_str[20];
        sprintf(user_str, "%ld", procesos->cred->uid.val);
        seq_printf(singleFile, "\n{ \"Pid\" : %d, \"Nombre\" : \"%s\", \"Estado\" : %ld , \"User\" : \"%s\", \"Mem\"  : %ld,", procesos->pid, procesos->comm, procesos->__state, user_str, procesomem);
        seq_printf(singleFile, "\"Subprocesos\" : [");
        cont = 0;
        list_for_each(listap, &(procesos->children)) {
             if (cont == 0){
                cont = 1;
            }else{
                seq_printf(singleFile, ",");
            }
            subprocesos= list_entry(listap, struct task_struct, sibling);
            seq_printf(singleFile, "\n{ \"Pid\" : %d, \"Nombre\" : \"%s\", \"Ppid\" : %d}", subprocesos->pid, subprocesos->comm, procesos->pid);
            if(subprocesos->__state == 0){
                ejecucion++;
            }else if(subprocesos->__state == 1){
                suspendido++;
            }else if(subprocesos->__state == 128){
                detenido++;
            }else if(subprocesos->__state == 260){
                zombie++;
            }
        }
        cont = 0;
        seq_printf(singleFile, "]\n}\n");
    }
    seq_printf(singleFile, "\n],\n");
    //Aqui empiezan los estados
    seq_printf(singleFile,"\"Estados\": \n{\"Ejecucion\": %li, \"Suspendido\": %li, \"Detenido\": %li, \"Zombie\": %li, \"Total\": %li}\n", ejecucion, suspendido, detenido, zombie, ejecucion + suspendido + detenido + zombie);
    seq_printf(singleFile, "}\n");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file) {
    return single_open(file, listar_procesos, NULL);
}

static struct proc_ops operaciones= {
    .proc_open = al_abrir,
    .proc_read = seq_read 
};

static int _insert(void) {
    proc_create("cpu_201800476", 0, NULL, &operaciones);
    printk(KERN_INFO "Marvin Alexis Estrada Florian\n");
    return 0;
}

static void _remove(void) {
    remove_proc_entry("cpu_201800476", NULL);
    printk(KERN_INFO "Primer Semestre 2023\n");
}

module_init(_insert);
module_exit(_remove);
