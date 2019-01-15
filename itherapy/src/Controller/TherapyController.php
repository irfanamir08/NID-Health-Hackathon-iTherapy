<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Therapy Controller
 *
 * @property \App\Model\Table\TherapyTable $Therapy
 *
 * @method \App\Model\Entity\Therapy[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class TherapyController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Users']
        ];
        $therapy = $this->paginate($this->Therapy);

        $this->set(compact('therapy'));
    }

    /**
     * View method
     *
     * @param string|null $id Therapy id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $therapy = $this->Therapy->get($id, [
            'contain' => ['Users', 'Sessions']
        ]);

        $this->set('therapy', $therapy);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $therapy = $this->Therapy->newEntity();
        if ($this->request->is('post')) {
            $therapy = $this->Therapy->patchEntity($therapy, $this->request->getData());
            if ($this->Therapy->save($therapy)) {
                $this->Flash->success(__('The therapy has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The therapy could not be saved. Please, try again.'));
        }
        $users = $this->Therapy->Users->find('list', ['limit' => 200]);
        $this->set(compact('therapy', 'users'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Therapy id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $therapy = $this->Therapy->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $therapy = $this->Therapy->patchEntity($therapy, $this->request->getData());
            if ($this->Therapy->save($therapy)) {
                $this->Flash->success(__('The therapy has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The therapy could not be saved. Please, try again.'));
        }
        $users = $this->Therapy->Users->find('list', ['limit' => 200]);
        $this->set(compact('therapy', 'users'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Therapy id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $therapy = $this->Therapy->get($id);
        if ($this->Therapy->delete($therapy)) {
            $this->Flash->success(__('The therapy has been deleted.'));
        } else {
            $this->Flash->error(__('The therapy could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
